import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { Weather } from "./weather.model";

@Injectable()
export class WeatherService {
    weathers: any[] = [];
    alreadyCalled: boolean = false;

    readFile() : string[]{
        let fileContent = fs.readFileSync('weather.dat', 'utf8');
        let lines = fileContent.split('\n').map(str => str.trim()); 
        return lines;
    }

    dataNormalizer(dataToNormalized) : any[]{
      let formattedLines = [];
      for(let i = 1; i<dataToNormalized.length-2; i++){
          let lastChars = '';
          let charParsed = [];
          for(let j=0; j<dataToNormalized[i].length; j++){
            if((dataToNormalized[i][j]).match('^[0-9]$')){
              lastChars += dataToNormalized[i][j];
            }
            else{
              if(lastChars != ''){
                charParsed.push(lastChars);
                lastChars = '';
              }
            }
          }
          if(charParsed.length != 0)
          formattedLines.push(charParsed);
        }
        return formattedLines;  
    }

    objectCreator(dataNormalized) : any{
      dataNormalized.forEach(element => {
          let day = element[0];
          let max = element[1];
          let min = element[2];
          let difference = max - min;
          let weather = new Weather(day, max, min, difference);
          this.weathers.push(weather);
      });
    }

    executeTasks(){
      let lines = this.readFile();
      let dataNormalized = this.dataNormalizer(lines);
      this.objectCreator(dataNormalized);
    }

    displayWeather() : any{
      if(!this.alreadyCalled){
        this.executeTasks();
        this.alreadyCalled = true;   
      }
      return this.weathers;
    }

}