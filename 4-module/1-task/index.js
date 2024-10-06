function makeFriendsList(friends) {
  const list = document.createElement("ul");

  for (let friend of friends) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${friend.firstName} ${friend.lastName}`;
    list.append(listItem);
  }

  return list;
}
