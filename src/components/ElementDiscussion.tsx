type ElementDiscussion = {
    penulis: string,
    created_at: Date,
    updated_at: Date,
    judul: string,
    konten: string,
    jumlah_komentar: number,
};

const ElementDiscussion = ({
    penulis,
    created_at,
    updated_at,
    judul,
    konten,
    jumlah_komentar,
}: ElementDiscussion) => {
    return (
        <div className="flex flex-col justify-start items-start w-full bg-white py-4 px-6 rounded-md gap-4">
            <div className="flex flex-row">
                <div className="flex min-h-[50px] max-h-[50px] min-w-[50px] max-w-[50px] bg-[#888888] rounded-[50%] mr-[5%]"></div>
                <div className="flex flex-col whitespace-nowrap">
                    <p className="font-semibold">{penulis}</p>
                    <p className="text-xs">{created_at}</p>
                    <p className="text-xs">Modified at: {updated_at}</p>
                </div>
            </div>
            <p className="font-semibold">{judul}</p>
            <p>{konten}</p>
            <p className="pt-[1%]">{jumlah_komentar} komentar</p>
        </div>
    );
};

export default ElementDiscussion;