import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Chart } from 'chart.js';
import { APIService } from '../API.service';
import { Investment } from './investment';
import { Router } from '@angular/router';

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
    date: "",
    userId: ""
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
  public investGraph: Chart;

  constructor(private api: APIService, private router: Router) { }

  async ngOnInit() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.userId = user.attributes.sub;
      this.investment.userId = this.userId
      this.userName = user.username;
    })
      .catch(err => console.log(err));

    await this.getInvestments();
    this.getGraph();
  }

  public async createInvestment() {
    await this.api.CreateInvestment(this.investment);
    this.investment = {
      type: "",
      value: 0,
      date: "",
      userId: this.userId
    }
    await this.getInvestments();
    this.getGraph()
  }

  private async cleanRenda() {
    this.rendaVariavel = {
      items: [],
      sum: 0
    }

    this.rendaFixa = {
      items: [],
      sum: 0
    }
  }

  public async getInvestments() {
    this.cleanRenda();
    this.investments = await this.api.ListInvestments({ userId: { eq: this.userId }});
    this.investments = this.investments.items.sort((a, b) =>  new Date(b.date).getTime() - new Date(a.date).getTime());
    this.investments.map(investment => {
      if (investment.type === "RENDA_FIXA") {
        this.addRendaFixa(investment);
      } else {
        this.addRendaVariavel(investment);
      }
    })
  }

  private async addRendaFixa(investment) {
    this.rendaFixa.items.push(investment);
    this.rendaFixa.sum += investment.value;
  }

  private async addRendaVariavel(investment) {
    this.rendaVariavel.items.push(investment);
    this.rendaVariavel.sum += investment.value;
  }

  public async deleteInvestment(investment) {
    await this.api.DeleteInvestment({ id: investment.id })
    await this.getInvestments();
    this.getGraph();
  }

  public trackByFunc(index, item) {
    return item.id;
  }

  public logOut() {
    Auth.signOut({ global: true })
    .then(data => {
      this.router.navigate(['/auth']);
    })
    .catch(err => console.log(err));
  }

  public getGraph() {
    let total = this.rendaFixa.sum + this.rendaVariavel.sum;
    this.investGraph = new Chart('investmentGraph', {
      type: 'doughnut',
      data: {
        labels: [`${ (this.rendaFixa.sum/total*100).toFixed(2) }% Renda Fixa`, `${ (this.rendaVariavel.sum/total*100).toFixed(2) }%  Renda Variavel`],
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
        legend: {
          position: 'left',
          labels: {
            fontSize: 30,
            fontFamily: "'Roboto', 'sans-serifa'"
          }

        },
        title: {
          display: true,
          text: "Resumo da carteira",
          fontSize: 24,
          fontFamily: "'Roboto', 'sans-serifa'",
          fontColor: '#000',
          padding: 50
        }
      }
    });
  }

}
