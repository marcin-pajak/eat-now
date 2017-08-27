const ButtonLink = ({isActive, id, children}) => (`
  <button
    data-id=${id}
    class="Button Button--link ${isActive ? 'is-active' : ''}">
      ${children}
  </button>
`);

export default ButtonLink;