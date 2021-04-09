import express from 'express'
import pool from '../database/db'

class BookController {
    async getAllBooks(req: express.Request, res: express.Response) {
        const books = await pool.query('SELECT * FROM book')
        res.json(books.rows)
    }
    async getOneBookById(req: express.Request, res: express.Response) {
        const id = req.params.id
        const book = await pool.query('SELECT * FROM book where id = $1', [id])
        res.json(book.rows[0])
    }
    async getSortedBooks(req: express.Request, res: express.Response) {
        const sort = req.body.sort
        let books;
        switch(sort) {
            case 'price-desc':
                books = await pool.query('SELECT * FROM book ORDER BY price DESC')
                break;
            case 'price-asc':
                books = await pool.query('SELECT * FROM book ORDER BY price ASC')
                break;
        }
        res.json(books?.rows)
    }
}

export default new BookController()