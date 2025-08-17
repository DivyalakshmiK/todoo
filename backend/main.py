from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import HTTPException
from starlette.middleware.cors import CORSMiddleware

# ----------------------------------------------------------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------------------------------------------

class TaskIn(BaseModel):
    title:str
    completed:bool

class TaskOut(BaseModel):
    tid:int
    title:str
    completed:bool

class Title(BaseModel):
    title:str

# -------------------------------------------------------------------------------------

storage = [
    {"tid": 1, "title": "task1", "completed": True},
    {"tid": 2, "title": "task2", "completed": False},
    {"tid": 3, "title": "task3", "completed": False}
]

counter = len(storage)

# -------------------------------------------------------------------------------

@app.get("/tasks")
def get_all_tasks():
    return storage

@app.post("/tasks", response_model=TaskOut)
def create_task(task:TaskIn):
    global counter
    counter +=1
    task_dict = task.dict()
    task_dict["tid"]= counter
    storage.append(task_dict)
    return task_dict

@app.put("/complete/{tid}", response_model=TaskOut)
def mark_complete(tid:int):
    # temp = 0
    for task in storage:
        if task["tid"] == tid:
            task["completed"] = True 
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.put("/tasks/title/{tid}", response_model= TaskOut)
def update_title(tid:int, inputt:Title):
    for task in storage:
        if task["tid"] == tid:
            task["title"] = inputt.title
            return task 
    raise HTTPException(status_code=404, detail = "Task not found")

    
@app.delete("/tasks/{tid}")
def delete(tid:int):
    for i,item in enumerate(storage):
        if item["tid"] == tid:
            storage.pop(i)
            return { "message": "Task deleted successfully" }
    raise HTTPException(status_code=404, detail = "Task not found")
