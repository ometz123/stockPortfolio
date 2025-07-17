create the .env file: run:
```sh
cp .env.example .env
```

After everything is set up, you can start the server and create your first portfolio.

* To create the first portfolio, Run:
```sh
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"userName": "john_doe", "stocks": ["AAPL", "GOOGL", "MSFT", "TSLA"]  }'
```

---


