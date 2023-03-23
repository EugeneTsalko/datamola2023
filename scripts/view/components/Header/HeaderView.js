class HeaderView extends Component {
  constructor(parentId, user = null) {
    super(parentId, 'header', ['header'], { id: 'header' });
    this.user = user;
    this.logo = DomHelper.createNode('a', ['logo-link'], { href: 'index.html' });
    this.nav = DomHelper.createNode('nav', ['nav']);

    this.greeting = DomHelper.createNode('span');
    this.greeting.textContent = `Hi, ${this.user}!`;
    this.profileBtn = DomHelper.createNode('a', [
      'btn',
      'secondary-btn',
      'icon-btn',
      'profile-btn',
    ]);
    this.logoutBtn = DomHelper.createNode('button', ['btn', 'logout-btn']);
    this.nav.append(this.greeting, this.profileBtn, this.logoutBtn);
    this.node.append(this.logo, this.nav);
  }
}
