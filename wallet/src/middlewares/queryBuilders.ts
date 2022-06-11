import { Request, Response, NextFunction } from "express";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";


interface IFetchParams {
  filterOptions: {
    user?: string;
    itemId?: any;
    status: string;
    createdAt?: {
      $gte: Date;
      $lte: Date;
    }
    extraDescription?: any;
  },
  pagination: {
    skip: number;
    limit: number;
    page: number;
  }
}

export class QueryBuilder {
  static allTransactions(req: Request, res: Response, next: NextFunction) {
    const startDate: any = req.query.startDate;
    const endDate: any = req.query.endDate;
    const { limit, page, movieId, movieType } = req.query;
    const limitNumber = limit ? parseInt(limit.toString(), 10) : 10;
    const pageNumber: number = page ? parseInt(page.toString()) : 1;
    const fetchParams: IFetchParams = {
      filterOptions: {
        user: req.currentUser?.id,
        itemId: movieId,
        status: 'success',
        createdAt: {
          $gte: startOfDay(new Date(startDate)),
          $lte: endOfDay(new Date(endDate)),
        },
        extraDescription: req.query.movieType,
      },

      pagination: {
        skip: limitNumber * (pageNumber - 1),
        limit: limitNumber,
        page: pageNumber,
      },
    };
    if (!movieType) delete fetchParams.filterOptions.extraDescription;
    if (!movieId) delete fetchParams.filterOptions.itemId;
    if (!startDate || !endDate) {
      delete fetchParams.filterOptions.createdAt;
    }
    res.locals.fetchParams = fetchParams;

    return next();
  }
}
