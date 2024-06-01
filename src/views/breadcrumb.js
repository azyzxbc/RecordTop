const BreadCrumb = ({ page }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">RecordTop</li>
        <li className="breadcrumb-item active" aria-current="page">
          {page}
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
