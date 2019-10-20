import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';
import { Investment } from './investment';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.less']
})
export class InvestmentsComponent implements OnInit {
  private userId: string;
  public userName: string;
  public investment: Investment = {
    type: "",
    value: 0,
    date: ""
  }
  public investments: any;
  public rendaVariavel = {
    items: [],
    sum: 0
  }
  public rendaFixa = {
    items: [],
    sum: 0
  }
  constructor(private api: APIService) { }

  ngOnInit() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userId = user.attributes.sub;
      this.userName = user.username;
    })
    .catch(err => console.log(err));

    this.getInvestments();
  }

  async createInvestment() {
    await this.api.CreateInvestment(this.investment);
  }

  async getInvestments() {
    this.investments = await this.api.ListInvestments();
    this.investments = this.investments.items.sort((a, b) => a.date < b.date);
    this.investments.map(investment => {
      if (investment.type === "RENDA_FIXA") {
        this.rendaFixa.items.push(investment);
        this.rendaFixa.sum += investment.value;
      } else {
        this.rendaVariavel.items.push(investment);
        this.rendaVariavel.sum += investment.value;
      }
    })
  }

  public trackByFunc(index, item) {
    return item.id;
  }

}
