import {Injectable} from "@angular/core";
import {Centrifuge} from "centrifuge";

@Injectable({
  providedIn: "root"
})
export abstract class CentrifugeAbstract {
  protected abstract endpoint: string;
  protected client = new Centrifuge(this.endpoint, {timeout: 5000});

  protected connect(): void {
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
    const sub = this.client.newSubscription(channel, {data});

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
