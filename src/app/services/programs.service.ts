import { Injectable } from '@angular/core';

import * as data from 'src/assets/data/data.json';
import { Program } from 'src/app/models/program';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private programs: Program[] = (data as any).default;

  constructor() {
    this.assignImage();
  }

  assignImage() {
    this.programs.map((p) => {
      switch (p.school) {
        case 'Nova SBE':
          p.image = 'assets/images/Nova SBE.png';
          break;
        case 'EPITA':
          p.image = 'assets/images/epita.png';
          break;
        case 'IMT Atlantique':
          p.image = 'assets/images/Mines Telecom .jpg';
          break;
        case 'TOULOUSE BUSINESS SCHOOL':
          p.image = 'assets/images/TOULOUSE BUSINESS SCHOOL.png';
          break;
        case 'KEDGE BS':
          p.image = 'assets/images/KEDGE BS.png';
          break;
        case 'PARIS SCHOOL OF BUSINESS':
          p.image = 'assets/images/PARIS SCHOOL OF BUSINESS.png';
          break;
        case 'AUDENCIA':
          p.image = 'assets/images/AUDENCIA.png';
          break;
        case 'Montpellier BS':
          p.image = 'assets/images/Montpellier BS.png';
          break;
        case 'EISTI':
          p.image = 'assets/images/EISTI.png';
          break;
        case 'ESC CLERMONT':
          p.image = 'assets/images/ESC CLERMONT.png';
          break;
        case 'SKEMA':
          p.image = 'assets/images/SKEMA.png';
          break;
        case 'ESAIP':
          p.image = 'assets/images/ESAIP.png';
          break;
        case 'ESSEC':
          p.image = 'assets/images/essec.png';
          break;
        case 'ICN':
          p.image = 'assets/images/ICN.png';
          break;
        case 'IESEG':
          p.image = 'assets/images/IESEG.png';
          break;
        case 'IPAG':
          p.image = 'assets/images/IPAG.png';
          break;
        case 'RENNES BUSINESS SCHOOL':
          p.image = 'assets/images/rennes school of business.png';
          break;
        case 'NEOMA':
          p.image = 'assets/images/NEOMA.png';
          break;
        case 'ECAM Lyon':
          p.image = 'assets/images/ECAM Lyon.png';
          break;
        case 'ISEP':
          p.image = 'assets/images/ISEP.png';
          break;
        case 'EM NORMANDIE':
          p.image = 'assets/images/EM_Normandie-Logo.jpg';
          break;
        case 'EXCELIA':
          p.image = 'assets/images/EXCELIA.png';
          break;
        case 'ESSCA':
          p.image = 'assets/images/Logo_ESSCA_Eng_SsBaseline.png';
          break;
        case 'IUBH':
          p.image = 'assets/images/IUBH.png';
          break;
        case 'SRH : Germany':
          p.image = 'assets/images/srh.jpg';
          break;
        case 'UE Germany':
          p.image = 'assets/images/ue.png';
          break;
      }
    });
  }

  getPrograms() {
    return [...this.programs.slice(0,10)];
  }

  filterProgramByCity(prop: string, value: string) {
    const cities = this.getCities();
    const isCity = cities.includes(value);
    if (!isCity) return [];
    return this.programs.filter((p) => p[prop] === value);
  }
  filterProgram(prop: string, value: string, programs: Program[]) {
    return programs.filter((p) => p[prop] === value);
  }

  getCities() {
    const cities = this.programs.map((p) => p.city.trim());
    const uniqueCities = new Set(cities);
    return [...uniqueCities];
  }
  getSchools() {
    const schools = this.programs.map((p) => p.school.trim());
    const uniqueSchools = new Set(schools);
    return [...uniqueSchools];
  }
  getFields() {
    const fields = this.programs.map((p) => p.type.trim());
    const uniqueFields = new Set(fields);
    return [...uniqueFields];
  }
  //Program
  getLevels() {
    const level = this.programs.map((p) => p.level.trim());
    const u = new Set(level);
    console.log(u);
  }
  getPrice() {
    const price = this.programs.map((p) => p.fee.trim());
    const p = new Set(price);
    const fees = [...p].map((p) => parseFloat(p.replace(',', '')));
    console.log(fees);
    return fees;
  }

  filterMultiple(
    price: string,
    language: string,
    schools: string[],
    fields: string[],
    program: string,
    cities: string[]
  ) {
    let filteredData: Program[] = this.programs;
    if (language) {
      if (language === 'French' || language === 'English')
        filteredData = this.filterProgram('Language', language, filteredData);
    }
    if (program) {
      filteredData = this.filterProgram('level', program, filteredData);
    }
    if (cities.length > 0) {
      filteredData = this.checkMultipleFilter('city', cities, filteredData);
    }
    // console.log('after city', filteredData);
    if (schools.length > 0) {
      filteredData = this.checkMultipleFilter('school', schools, filteredData);
    }
    // console.log('after school', filteredData);

    if (fields.length > 0) {
      filteredData = this.checkMultipleFilter('type', fields, filteredData);
    }
    // console.log('after fields', filteredData);
    // if (price === 'Price: low to high') {
    //   const price = this.programs.map((p) => p.fee.trim());
    //   const p = new Set(price);
    //   const fees = [...p].map((p) => parseFloat(p.replace(',', '')));
    //   console.log(fees);
    // }

    return filteredData ? filteredData : [];
  }

  checkMultipleFilter(prop, arr, updatedPrograms) {
    let temp2: Program[] = [];
    arr.forEach((pp) => {
      const temp1 = [...this.filterProgram(prop, pp, updatedPrograms)];
      if (temp1.length > 0) {
        temp2 = [...temp2, ...temp1];
      }
    });
    return updatedPrograms ? temp2 : updatedPrograms;
  }
}
