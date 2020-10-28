/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';

@Injectable()
export class ScrapingService {
    constructor(@InjectPage() private readonly page: Page) {}  
    async crawl(url: string, RNC: string){
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    await this.page.content();
    await this.foundValue(RNC)
    };
    
    async foundValue(RNC: string){
     await this.page.type("#ctl00_cphMain_txtRNCCedula",RNC)
     await this.page.click('#ctl00_cphMain_btnBuscarPorRNC')
     await this.page.waitFor(3000)
     await this.isValue()
    }
    async isValue(){
        const isValue = await this.page.evaluate(()=>{
            const RNC = document.querySelector('#ctl00_cphMain_dvDatosContribuyentes > tbody > tr')
            return RNC
        })
        if(!isValue){
            throw new NotFoundException('Not found RNC')
        }
    }

}