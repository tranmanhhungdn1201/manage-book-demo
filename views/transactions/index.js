h1 Transactions
a(href="transactions/create") Create transaction
<br>
a(href="books") Back
h3 List of transaction
ul
 each transaction in transactions
  li
   span=transaction.username
   span &nbsp
   span=transaction.book
