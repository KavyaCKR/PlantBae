import ShortUniqueId from "short-unique-id"

export async function get_id() {
    const uid = new ShortUniqueId({ length: 10 });

    return await uid.rnd(); 
}
