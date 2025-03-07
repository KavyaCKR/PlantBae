import { createClient } from '@supabase/supabase-js'
import { get_id } from '../utils/id.js';
import { set_message_reminder } from '../twilio/twilio.js';


const supabaseUrl = 'https://zvfdabncqkoctpwwzyxe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmRhYm5jcWtvY3Rwd3d6eXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4Mjg5MDAsImV4cCI6MjA1NjQwNDkwMH0.rh_jusVBNfQAiCwbyG6rc-rsvG9rVvZE8FF8jh5OPwE"
const supabase = createClient(supabaseUrl, supabaseKey)


async function is_user(email) {

    const { data, error } = await supabase
        .from("user")
        .select()
        .eq('email', email);


    if (error) {
        return { success: null, error: error.message };
    }

    return { success: data, error: null };
}

async function create_profile(name, email, phone) {

    const {error} = await supabase
    .from("user")
    .insert({
        name:name,
        email:email,
        phone:phone
    });

    return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }

}

async function check_user(email) {
    const {data, error} = await supabase
    .from("user")
    .select()
    .eq("email",email);

    return error ? { success:null, error:error.message } : { success:data.length == 0 ? null : data, error:null }

}

async function set_schedule(data) {



    const id = await get_id();
    data.id = id;
    console.log(data)
    console.log("start")
    const {error} = await supabase
    .from("schedule")
    .insert({
        id: data.id,
        plant_name: data.plant_name,
        time: data.time,
        task: data.task,
        day: data.day,
        email: data.email
    });
    console.log("done")
    console.log(error);
    return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }




}


async function get_schedule(email) {

    const {data, error} = await supabase
    .from("schedule")
    .select()
    .eq("email",email.email);

    console.log(data)
    return error ? { success:null, error:error.message } : { success:data, error:null }

}


async function delete_schedule(id) {

    const {error} = await supabase
    .from("schedule")
    .delete()
    .eq("id",id)

    return error ? { success:null, error:error.message } : { success:"Updated Successfuly", error:null }


}


async function set_reminder(data) {

    const id = await get_id();
    console.log(id)
    const {error} = await supabase
    .from("reminders")
    .insert({
        id:id,
        email:data.email,
        task: data.task,
        time:data.time
    });

    await set_message_reminder(data.task, data.time);

    return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }
}


async function get_reminder(email) {
    
    const {data, error} = await supabase
    .from("reminders")
    .select()
    .eq("email",email);

    return error ? { success:null, error:error.message } : { success:data.length == 0 ? null : data, error:null }

}


async function delete_reminder(data) {


    const {error} = await supabase
    .from("reminders")
    .delete()
    .eq('id',data.id);

    return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }

}


export {
    is_user,
    create_profile,
    set_schedule,
    set_reminder,
    delete_reminder,
    get_schedule,
    check_user,
    get_reminder,
    delete_schedule
}