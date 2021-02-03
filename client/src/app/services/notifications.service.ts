import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  readonly url = environment.url + environment.routes.notification;

  private eventSource!: EventSource;
  public notifications: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpService: HttpService) {
    this.init();
  }

  public init(): void {
    this.eventSource = new EventSource(this.url);
    this.eventSource.onmessage = (evt) => this._onMessage(evt);
    this.eventSource.onerror = (evt) => this._onError(evt);
    this.eventSource.onopen = (evt) => this._onOpen(evt);
  }

  private _onMessage(message: MessageEvent): void {
    this.notifications.emit(event);
  }

  private _onError(evt: Event): void {
  }

  private _onOpen(evt: Event): void {
  }

}
