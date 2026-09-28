from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Allow React frontend to communicate with Flask
CORS(app)

# Read CSV
df = pd.read_csv("college_placement_data.csv")


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.route("/")
def home():
    return "College Placement Analyzer API is running"


# --------------------------------------------------
# DASHBOARD SUMMARY
# --------------------------------------------------

@app.route("/api/dashboard")
def dashboard():

    total_students = len(df)

    total_companies = df["company"].nunique()

    average_package = df["package_lpa"].mean()

    highest_package = df["package_lpa"].max()

    lowest_package = df["package_lpa"].min()

    highest_cgpa = df["cgpa"].max()

    lowest_cgpa = df["cgpa"].min()

    return jsonify({
        "total_students": total_students,
        "total_companies": total_companies,
        "average_package": round(average_package, 2),
        "highest_package": highest_package,
        "lowest_package": lowest_package,
        "highest_cgpa": highest_cgpa,
        "lowest_cgpa": lowest_cgpa
    })


# --------------------------------------------------
# STUDENTS SELECTED BY COMPANY
# --------------------------------------------------

@app.route("/api/companies")
def companies():

    company_count = df["company"].value_counts()

    return jsonify(company_count.to_dict())


# --------------------------------------------------
# STUDENTS SELECTED BY BRANCH
# --------------------------------------------------

@app.route("/api/branches")
def branches():

    branch_count = df["branch"].value_counts()

    return jsonify(branch_count.to_dict())


# --------------------------------------------------
# AVERAGE PACKAGE BY COMPANY
# --------------------------------------------------

@app.route("/api/average-package/company")
def average_package_company():

    result = (
        df.groupby("company")["package_lpa"]
        .mean()
        .round(2)
        .to_dict()
    )
    return jsonify(result)
# --------------------------------------------------
# AVERAGE PACKAGE BY BRANCH
# --------------------------------------------------
@app.route("/api/average-package/branch")
def average_package_branch():
    result = (
        df.groupby("branch")["package_lpa"]
        .mean()
        .round(2)
        .to_dict()
    )
    return jsonify(result)
# --------------------------------------------------
# HIGHEST PACKAGE STUDENT
# --------------------------------------------------
@app.route("/api/highest-package")
def highest_package():
    student = df.loc[df["package_lpa"].idxmax()]
    return jsonify({
        "name": student["name"],
        "branch": student["branch"],
        "company": student["company"],
        "package_lpa": student["package_lpa"],
        "cgpa": student["cgpa"]
    })
# --------------------------------------------------
# LOWEST PACKAGE STUDENT
# --------------------------------------------------
@app.route("/api/lowest-package")
def lowest_package():
    student = df.loc[df["package_lpa"].idxmin()]
    return jsonify({
        "name": student["name"],
        "branch": student["branch"],
        "company": student["company"],
        "package_lpa": student["package_lpa"],
        "cgpa": student["cgpa"]
    })
# --------------------------------------------------
# HIGHEST CGPA STUDENT
# --------------------------------------------------
@app.route("/api/highest-cgpa")
def highest_cgpa():
    student = df.loc[df["cgpa"].idxmax()]
    return jsonify({
        "name": student["name"],
        "branch": student["branch"],
        "company": student["company"],
        "cgpa": student["cgpa"],
        "package_lpa": student["package_lpa"]
    })
# --------------------------------------------------
# ALL STUDENTS
# --------------------------------------------------
@app.route("/api/students")
def students():
    return jsonify(df.to_dict(orient="records"))
# --------------------------------------------------
# RUN SERVER
# --------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)