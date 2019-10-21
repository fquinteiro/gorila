import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';
import { Investment } from './investment';
import { Chart } from 'chart.js'

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
  public investGraph: [];

  constructor(private api: APIService) { }

  async ngOnInit() {
    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userId = user.attributes.sub;
      this.userName = user.username;
    })
    .catch(err => console.log(err));

    await this.getInvestments();
    this.getGraph();
  }

  public async createInvestment() {
    await this.api.CreateInvestment(this.investment);
    this.investment.type === "RENDA_VARIAVEL" ? this.addRendaVariavel(this.investment) : this.addRendaFixa(this.investment);
    this.investment = {
      type: "",
      value: 0,
      date: ""
    }
  }

  public async getInvestments() {
    this.investments = await this.api.ListInvestments();
    this.investments = this.investments.items.sort((a, b) => a.date < b.date);
    this.investments.map(investment => {
      if (investment.type === "RENDA_FIXA") {
        this.addRendaFixa(investment);
      } else {
        this.addRendaVariavel(investment);
      }
    })
  }

  public async addRendaFixa(investment) {
    this.rendaFixa.items.push(investment);
    this.rendaFixa.sum += investment.value;
  }

  public async addRendaVariavel(investment) {
    this.rendaVariavel.items.push(investment);
    this.rendaVariavel.sum += investment.value;
  }

  public async deleteInvestment(investment){
    await this.api.DeleteInvestment({ id: investment.id })
    if (investment.type === "RENDA_VARIAVEL") {
      this.rendaVariavel.items.splice(this.rendaVariavel.items.findIndex((i) => {
          return i.id === investment.id;
      }), 1)
      this.rendaVariavel.sum -= investment.value;
    } else {
      this.rendaFixa.items.splice(this.rendaFixa.items.findIndex((i) => {
        return i.id === investment.id;
    }), 1);
      this.rendaVariavel.sum -= investment.value;
    }
  }

  public trackByFunc(index, item) {
    return item.id;
  }

  public getGraph() {
    this.investGraph = new Chart('investmentGraph', {
      type: 'doughnut',
      data: {
          labels: ['Renda Fixa', 'Renda Variavel'],
          datasets: [{
              label: 'Valor Percentual',
              data: [this.rendaFixa.sum, this.rendaVariavel.sum],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
          }]
      },
      options: {
        title: {
          display: true,
          text: "Resumo da carteira"
        }
      }
    });


  }



}
