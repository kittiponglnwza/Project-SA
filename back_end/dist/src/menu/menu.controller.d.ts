import { MenusService } from './menu.service';
import { Menu } from '@prisma/client';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    findAll(): Promise<Menu[]>;
    findOne(id: number): Promise<Menu | null>;
    create(data: any): Promise<Menu>;
    update(id: number, data: Partial<Menu>): Promise<Menu>;
    remove(id: number): Promise<Menu>;
}
