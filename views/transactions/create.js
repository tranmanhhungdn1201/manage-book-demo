h1 create transaction
  form(action="transactions/create", method="POST")
    select(name="username")
      each user in users
        option(value=user.name) user.name