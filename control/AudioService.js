import NodeID3 from "node-id3";

export const getAudio = async (req, res) => {
    try {
        // извлекаем название песни (в будущем можно будет проработать это)
        const { songName } = req.params;
        // получение мета-данных об аудио
        const audio = await NodeID3.read(`./uploads/${songName}.mp3`);

        if (!audio) {
            return res.status(404).send('No song name found');
        }

        return res.status(200).json({ audio });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error while getting audio",
        });
    }
};