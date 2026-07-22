import psutil

CPU_THRESHOLD = 80
MEMORY_THRESHOLD = 80
DISK_THRESHOLD = 80

cpu = psutil.cpu_percent(interval=1)
memory = psutil.virtual_memory().percent
disk = psutil.disk_usage('/').percent
processes = len(psutil.pids())

print("===== System Health Report =====")
print(f"CPU Usage: {cpu}%")
print(f"Memory Usage: {memory}%")
print(f"Disk Usage: {disk}%")
print(f"Running Processes: {processes}")

if cpu > CPU_THRESHOLD:
    print("ALERT: CPU usage is above 80%!")

if memory > MEMORY_THRESHOLD:
    print("ALERT: Memory usage is above 80%!")

if disk > DISK_THRESHOLD:
    print("ALERT: Disk usage is above 80!")