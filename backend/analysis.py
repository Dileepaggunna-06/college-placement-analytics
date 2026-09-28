import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("college_placement_data.csv")

company_count = df["company"].value_counts()
Dileep = company_count.sum()
chandu = df["company"].unique() 
branch_count = df["branch"].value_counts()
print(branch_count)
print(company_count)
print("number of studets we have" , Dileep)
print("number of companies we have" , chandu)
company_count.plot(kind="bar" , color="yellow", edgecolor="green")

plt.title("Students Selected by Company")
plt.xlabel("Company")
plt.ylabel("Number of Students")
plt.show()

plt.title("Students Selected by Branch")
plt.xlabel("Branch")
plt.ylabel("Number of Students")
branch_count.plot(kind="bar" , color="blue", edgecolor="red")
plt.show()

branch_company = df.groupby(["branch", "company"]).size().unstack()

print(branch_company)

branch_company.plot(kind="bar")

plt.title("Company Selection by Branch")
plt.xlabel("Branch")
plt.ylabel("Number of Students")

plt.tight_layout()
plt.show()