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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], // Added RouterModule
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
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  async ngOnInit() {
    if (!this.isBrowser) return;

    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      await this.enumerateVideoDevices();

      await this.startCamera();
    } catch (err) {
      console.error('Camera access or device enumeration failed:', err);
    }
  }

  async enumerateVideoDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.videoDevices = devices.filter((d) => d.kind === 'videoinput');

    console.log(`🎥 Found ${this.videoDevices.length} camera(s):`);
    this.videoDevices.forEach((d, i) =>
      console.log(`[${i}] ${d.label || 'Unnamed'} (${d.deviceId})`)
    );
  }

  async startCamera() {
    if (!this.videoDevices.length) return;

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
    }
  }

  toggleCamera() {
    if (this.videoDevices.length <= 1) return;

    const stream = this.videoElement.nativeElement.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

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

      // Send to backend
      this.httpClient.post('https://barbados-hitachi-pittsburgh-doctrine.trycloudflare.com', {
        base64_img: this.base64Image
      }).subscribe({
        next: (res) => {
          console.log('✅ Upload success:', res);
      
          // Navigate with state passing the response data
          this.router.navigate(['/recepie'], {
            state: { imageData: res }
          });
        },
        error: (err) => {
          console.error('❌ Upload error:', err);
        }
      });
      
    }
  }
}
