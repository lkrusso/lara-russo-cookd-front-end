import "./Cookbook.scss";

function Cookbook({ cookbook }) {
  return (
    <article className="cookbook" key={cookbook.id}>
      <h3 className="cookbook__title">{cookbook.name}</h3>
    </article>
  );
}

export default Cookbook;
