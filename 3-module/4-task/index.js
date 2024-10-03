function showSalary(users, age) {
  const usersFilter = users.filter((user) => user.age <= age);

  const usersSalary = usersFilter.map((user) => {
    return `${user.name}, ${user.balance}`;
  });

  return usersSalary.join("\n");
}
