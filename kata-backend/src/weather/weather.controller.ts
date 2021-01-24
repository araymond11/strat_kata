import { Controller, Get } from "@nestjs/common";
import { WeatherService } from "./weather.service";

@Controller('weather')
export class WeatherController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    findAll(){
        return this.weatherService.displayWeather();
    }
}