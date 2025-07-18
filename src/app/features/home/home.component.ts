import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  base64Image: string | null = null;

  videoDevices: MediaDeviceInfo[] = [];
  currentDeviceIndex = 0;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit() {
    if (!this.isBrowser) return;

    try {
      // ✅ Step 1: Ask for camera permission before enumerateDevices
      await navigator.mediaDevices.getUserMedia({ video: true });

      // ✅ Step 2: Now enumerate devices with full access
      await this.enumerateVideoDevices();

      // ✅ Step 3: Start camera with first device
      await this.startCamera();
    } catch (err) {
      console.error('Camera access or device enumeration failed:', err);
    }
  }

  async enumerateVideoDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.videoDevices = devices.filter((d) => d.kind === 'videoinput');

    if (!this.videoDevices.length) {
      console.warn('No video input devices found.');
    }

    console.log(`🎥 Found ${this.videoDevices.length} camera(s):`);
    this.videoDevices.forEach((d, i) =>
      console.log(`  [${i}] ${d.label || 'Unnamed'} (${d.deviceId})`)
    );

    alert(`Number of camera devices: ${this.videoDevices.length}`);
  }

  async startCamera() {
    if (!this.videoDevices.length) {
      console.warn('No video input devices to start.');
      return;
    }

    const deviceId = this.videoDevices[this.currentDeviceIndex]?.deviceId;

    try {
      const constraints: MediaStreamConstraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.nativeElement.srcObject = stream;

      console.log(`🎬 Using camera: ${this.videoDevices[this.currentDeviceIndex]?.label}`);
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      if (err.name === 'OverconstrainedError' || err.name === 'NotFoundError') {
        console.error('No camera found or constraints could not be satisfied.');
      }
    }
  }

  toggleCamera() {
    if (this.videoDevices.length <= 1) {
      alert('No alternate cameras to toggle.');
      return;
    }

    // Stop current stream before switching
    const stream = this.videoElement.nativeElement.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    // Rotate to the next camera
    this.currentDeviceIndex = (this.currentDeviceIndex + 1) % this.videoDevices.length;
    this.startCamera();
  }

  captureImage() {
    if (!this.isBrowser) return;

    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.base64Image = canvas.toDataURL('image/png');
      console.log('📸 Captured image base64:', this.base64Image);

      // Send to backend
      this.httpClient.post('http://localhost:5000/', { base64_img: this.base64Image }).subscribe({
        next: (res) => console.log('✅ Upload success:', res),
        error: (err) => console.error('❌ Upload error:', err),
      });
    }
  }
}
