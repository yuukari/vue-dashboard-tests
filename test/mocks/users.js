import { rest } from 'msw';
import { faker } from '@faker-js/faker';

const users = [];
for (let i = 238; i > 0; i--) {
    const date = new Date();
    users.push({
        id: i,
        email: faker.internet.email(),
        last_name: faker.person.lastName(),
        first_name: faker.person.firstName(),
        created_at: date.toISOString(),
        updated_at: date.toISOString()
    });
}

export default [
    rest.get(`/api/users/layout`, (req, res, ctx) => {
       return res(ctx.json({
           primaryKey: 'id',
           columns: {
               id: {
                   title: 'ID',
                   key: 'id',
                   sorting: true,
                   filter: {
                       type: 'number'
                   }
               },
               email: {
                   title: 'E-Mail',
                   key: 'email',
                   filter: {
                       type: 'text'
                   }
               },
               last_name: {
                   title: 'Фамилия',
                   key: 'last_name',
                   filter: {
                       type: 'text'
                   }
               },
               first_name: {
                   title: 'Имя',
                   key: 'first_name',
                   filter: {
                       type: 'text'
                   }
               },
               created_at: {
                   title: 'Зарегистрирован',
                   key: 'created_at',
                   sorting: true
               },
               updated_at: {
                   title: 'Последнее действие',
                   key: 'updated_at',
                   sorting: true
               }
           },
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
        const sortBy = req.url.searchParams.get('sortBy');
        const sortOrder = req.url.searchParams.get('sortOrder') ?? 'ascend';

        let rows = [...users];

        if (sortBy != null) {
            rows = rows.sort((a, b) => {
                const av = sortOrder === 'ascend' ? a[sortBy] : b[sortBy];
                const bv = sortOrder === 'ascend' ? b[sortBy] : a[sortBy];

                if (av < bv) {
                    return -1;
                }
                if (av > bv) {
                    return 1;
                }
                return 0;
            });
        }

        rows = rows.slice(pageSize * page - pageSize, page * pageSize);

        return res(ctx.json({
            rows,
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