import instance from "./utils";

class API {

    async set_schedule(email,plant_name, time, task,day) {
        const response = await instance.post("/schedule",{
            id:"",
            email:email,
            plant_name:plant_name,
            time:time,
            task:task,
            day:day
        });

        return response.content;
    }


    async get_schedule(email) {
        const response = await instance.post("/get_schedule",{
            email:email
        });

        return response;
    }

    async delete_schedule(id) {
        const response = await instance.post("/delete_schedule", {
            id:id
        });

        return response;
    }

    async create_profile(name, email, phone) {
        const response = await instance.post("/create", {
            name:name,
            email:email,
            phone:phone
        });

        return response;
    }

    async check_user(email) {
        const response = await instance.post("/check_user", {
            email:email
        });

        return response;
    }

    async set_reminder(email, task, time) {
        const response = await instance.post("/reminder",{
            email:email,
            task:task,
            time:time
        })

        return response
    }


    async get_reminder(email) {
        const response = await instance.post("/get_reminder", {
            email:email
        });

        return response;
    }

    async ai(prompt) {
        const response = await instance.post("/ai", {
            input:prompt
        });

        return response;
    }



}


const api = new API();

export default api;