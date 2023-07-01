import { rest } from 'msw';

const users = [];
for (let i = 238; i > 0; i--) {
    const date = new Date();
    users.push({
        id: i,
        email: 'yuukari@example.com',
        last_name: 'Дмитриева',
        first_name: 'Лиза',
        created_at: date.toISOString(),
        updated_at: date.toISOString()
    });
}

export default [
    rest.get(`/api/users/layout`, (req, res, ctx) => {
       return res(ctx.json({
           primaryKey: 'id',
           columns: [
               {
                   title: 'ID',
                   key: 'id',
                   sorting: true,
                   filter: {
                       type: 'number'
                   }
               },
               {
                   title: 'E-Mail',
                   key: 'email',
                   filter: {
                       type: 'text'
                   }
               },
               {
                   title: 'Фамилия',
                   key: 'last_name',
                   filter: {
                       type: 'text'
                   }
               },
               {
                   title: 'Имя',
                   key: 'first_name',
                   filter: {
                       type: 'text'
                   }
               },
               {
                   title: 'Зарегистрирован',
                   key: 'created_at',
                   sorting: true
               },
               {
                   title: 'Последнее действие',
                   key: 'updated_at',
                   sorting: true
               }
           ],
           actions: [
               'view',
               'edit',
               'delete'
           ]
       }));
    }),

    rest.get('/api/users', (req, res, ctx) => {
        const page = req.url.searchParams.get('page') ?? 1;
        const pageSize = req.url.searchParams.get('pageSize') ?? 10;

        return res(ctx.json({
            rows: users.slice(pageSize * page - pageSize, page * pageSize),
            pagination: {
                page,
                pageCount: Math.ceil(users.length / pageSize)
            }
        }));
    }),

    rest.get('/api/users/:id', (req, res, ctx) => {
        return res(ctx.json(users[req.params.id]));
    }),

    rest.post('/api/users/:id', (req, res, ctx) => {
        return res(ctx.json(users[req.params.id]));
    }),

    rest.post('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(204));
    })
];