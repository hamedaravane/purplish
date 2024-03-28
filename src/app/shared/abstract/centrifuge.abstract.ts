import {Injectable} from "@angular/core";
import {Centrifuge, Subscription} from 'centrifuge';

@Injectable({
  providedIn: "root"
})
export abstract class CentrifugeAbstract {
  protected abstract endpoint: string;
  protected client!: Centrifuge;

  protected connect(): void {
    this.client = new Centrifuge(this.endpoint);

    this.client.on('connecting', (ctx) => {
      console.log('connecting', ctx);
    });

    this.client.on('connected', (ctx) => {
      console.log('connected', ctx);
    });

    this.client.on('disconnected', (ctx) => {
      console.log('disconnected', ctx);
    });

    this.client.on('error', (ctx) => {
      console.warn('client error', ctx);
    });

    this.client.connect();
  }

  protected subscribe(channel: string, data?: any) {
    const sub: Subscription = this.client.newSubscription(channel, {data});

    sub.on('subscribing', (ctx) => {
      console.log('subscribing', ctx);
    });

    sub.on('subscribed', (ctx) => {
      console.log('subscribed', ctx);
    });

    sub.on('unsubscribed', (ctx) => {
      console.log('unsubscribed', ctx);
    });

    sub.on('publication', (ctx) => {
      console.log('publication', ctx);
    })

    sub.subscribe();
  }

  protected unsubscribe(channel: string) {
    const sub = this.client.getSubscription(channel);
    sub?.unsubscribe();
  }

  protected disconnect() {
    this.client.disconnect();
  }

  protected sendMessage(channel: string, message: any) {
    this.client.publish(channel, message).then(() => {
      console.log("Message published");
    })
  }
}
