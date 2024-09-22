import { AgunlarMaterialModule } from './module/agunlar-material.module';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Pessoa } from './model/pessoa';
import { ImcInfo } from './interface/imc-info';

const ELEMENT_DATA: ImcInfo[] = [
  { imc: 'Menor que 18,5', classificacao: 'Magreza', obesidade: '0' },
  { imc: 'Entre 18,5 e 24,9', classificacao: 'Normal', obesidade: '0' },
  { imc: 'Entre 25,0 e 29,9', classificacao: 'Sobrepeso', obesidade: '1' },
  { imc: 'Entre 30,0 e 39,9', classificacao: 'Obesidade', obesidade: '2' },
  { imc: 'Maior que 40,0', classificacao: 'Obesidade Grave', obesidade: '3' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    AgunlarMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'IMFácil!';

  pessoa = new Pessoa();
  clickedRows = new Set<ImcInfo>();

  displayedColumns: string[] = ['imc', 'classificacao', 'obesidade'];
  dataSource: any[] = ELEMENT_DATA;

  calcularImc(pessoa: Pessoa): void {
    this.clickedRows.clear();

    const altura = parseFloat(pessoa.altura.replace(',', '.'));
    const peso = parseFloat(pessoa.peso.replace(',', '.'));
    const imc = peso / (altura ** 2);
    pessoa.imc = imc.toFixed(2);

    if (!pessoa.imc || pessoa.imc == 'NaN') {
      pessoa.imc = '';
    }

    if (parseFloat(pessoa.imc) <= 18.5) {
      this.clickedRows.add(ELEMENT_DATA[0]);
    }

    if (parseFloat(pessoa.imc) > 18.5 && parseFloat(pessoa.imc) <= 24.9) {
      this.clickedRows.add(ELEMENT_DATA[1]);
    }

    if (parseFloat(pessoa.imc) >= 25 && parseFloat(pessoa.imc) <= 29.9) {
      this.clickedRows.add(ELEMENT_DATA[2]);
    }

    if (parseFloat(pessoa.imc) >= 30 && parseFloat(pessoa.imc) <= 39.9) {
      this.clickedRows.add(ELEMENT_DATA[3]);
    }

    if (parseFloat(pessoa.imc) >= 40) {
      this.clickedRows.add(ELEMENT_DATA[4]);
    }
  }

  limparCampos(): void {
    this.pessoa = new Pessoa();
    this.clickedRows.clear();
    this.dataSource = ELEMENT_DATA;
  }
}
