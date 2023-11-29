import "./DevelopmentPage.scss";

function DevelopmentPage() {
  return (
    <>
      <div class="pan-loader">
        <div class="loader"></div>
        <div class="pan-container">
          <div class="pan"></div>
          <div class="handle"></div>
        </div>
        <div class="shadow"></div>
      </div>
      <p className="development-message">This page is still cooking...</p>
    </>
  );
}

export default DevelopmentPage;
