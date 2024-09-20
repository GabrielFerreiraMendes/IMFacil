import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from './shared/angular-material.module';
import { Pessoa } from './model/pessoa';
import { FormsModule } from '@angular/forms';
import { elementAt } from 'rxjs';

export interface tabelaImc {
  imc: string;
  classificacao: String;
  obesidade: string;
}

const ELEMENT_DATA: tabelaImc[] = [
  {imc: 'Menor que 18,5', classificacao: 'Magreza', obesidade: '0'},
  {imc: 'Entre 18,5 e 24,9', classificacao: 'Normal', obesidade: '0'},
  {imc: 'Entre 25,0 e 29,9', classificacao: 'Sobrepeso', obesidade: '1'},
  {imc: 'Entre 30,0 e 39,9', classificacao: 'Obesidade', obesidade: '2'},
  {imc: 'Maior que 40,0', classificacao: 'Obesidade Grave', obesidade: '3'},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'imc_pj';

  pessoa = new Pessoa();
  clickedRows = new Set<tabelaImc>();

  displayedColumns: string[] = ['imc', 'classificacao', 'obesidade'];
  dataSource: any[] = ELEMENT_DATA;

  calcularImc(pessoa : Pessoa): void {
  this.clickedRows.clear();

    const altura = parseFloat(pessoa.altura.replace(',', '.'));
    const peso = parseFloat(pessoa.peso.replace(',', '.'));
    const imc = peso / (altura ** 2);
    pessoa.imc = imc.toFixed(2);

    if (!pessoa.imc || pessoa.imc == 'NaN') {
      pessoa.imc = '';
    }

    if (parseFloat(pessoa.imc) <= 18.5){
      this.clickedRows.add(ELEMENT_DATA[0]);
    }

    if(parseFloat(pessoa.imc) > 18.5 && parseFloat(pessoa.imc) <= 24.9){
      this.clickedRows.add(ELEMENT_DATA[1]);
    }

    if(parseFloat(pessoa.imc) >= 25 && parseFloat(pessoa.imc) <= 29.9){
      this.clickedRows.add(ELEMENT_DATA[2]);
    }

    if(parseFloat(pessoa.imc) >= 30 && parseFloat(pessoa.imc) <= 39.9){
      this.clickedRows.add(ELEMENT_DATA[3]);
    }

    if(parseFloat(pessoa.imc) >= 40 ){
      this.clickedRows.add(ELEMENT_DATA[4]);
    }
  }
}
