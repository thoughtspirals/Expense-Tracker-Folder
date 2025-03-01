import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <button
        className="toggle-button navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header sub-title">
          <h5 className="offcanvas-title fs-2" id="offcanvasScrollingLabel">
            Expense Tracker
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Scrollable Menu */}
        <div
          className="offcanvas-body p-3 d-flex flex-column justify-content-between"
          style={{ height: "100vh" }}
        >
          <ul className="list-unstyled flex-grow-1">
            <li>
              <Link
                to="/dashboard"
                className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-decoration-none text-dark"
              >
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/ai-insights"
                className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-dark text-decoration-none"
              >
                <i className="bi bi-lightbulb me-2"></i> Ai Insights
              </Link>
            </li>

            <li>
              <Link
                to="/transactions"
                className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-decoration-none text-dark"
              >
                <i className="bi bi-currency-rupee me-2"></i> Manage Expenses
              </Link>
            </li>
            <li>
              <Link
                to="/all-expenses"
                className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-decoration-none text-dark"
              >
                <i className="bi bi-currency-dollar me-2"></i> All Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-decoration-none text-dark"
              >
                <i className="bi bi-gear me-2"></i> Settings
              </Link>
            </li>
          </ul>

          {/* Logout Button at Bottom */}
          <div className="mt-auto">
            <Link
              to="/logout"
              className="local-links d-flex fs-5 align-items-center py-2 px-3 rounded text-decoration-none text-danger"
            >
              <i className="bi bi-power me-2"></i> Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
