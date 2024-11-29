import Controller from '../interfaces/controller.interface';
import { Request, Response, Router } from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getAll);
        this.router.post(this.path, this.addData);
        this.router.get(`${this.path}/:id`, this.getById);
        this.router.delete(`${this.path}/:id`, this.deleteById);
    }

    private getAll = (req: Request, res: Response) => {
        res.status(200).json(testArr);
    };

    private getById = (req: Request, res: Response) => {
        const { id } = req.params;
        const item = testArr[+id];
        item
            ? res.status(200).json(item)
            : res.status(404).json({ error: "Not Found" });
    };

    private addData = (req: Request, res: Response) => {
        const { value } = req.body;
        testArr.push(value);
        res.status(201).json({ success: true, testArr });
    };

    private deleteById = (req: Request, res: Response) => {
        const { id } = req.params;
        testArr = testArr.filter((_, index) => index !== +id);
        res.status(200).json({ success: true, testArr });
    };
}

export default PostController;
