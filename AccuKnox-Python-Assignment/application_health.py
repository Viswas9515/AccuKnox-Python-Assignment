import requests

url = input("Enter Application URL: ")

try:
    response = requests.get(url, timeout=10)

    print(f"HTTP Status Code: {response.status_code}")

    if response.status_code == 200:
        print("Application Status: UP")
    else:
        print("Application Status: DOWN")

except requests.exceptions.RequestException:
    print("Application Status: DOWN")