export type Todolist = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type Response<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

