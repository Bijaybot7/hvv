import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    create(createVacancyDto: CreateVacancyDto): Promise<Vacancy>;
    findAll(): Promise<Vacancy[]>;
    findOne(id: string): Promise<Vacancy>;
    update(id: string, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy>;
    remove(id: string): Promise<void>;
    findByUserId(userId: string): Promise<Vacancy[]>;
}
