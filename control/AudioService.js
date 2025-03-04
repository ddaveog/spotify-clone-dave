import NodeID3 from "node-id3";
import path from "path";

export const getAudio = async (req, res) => {
    try {
        // извлекаем название песни (в будущем можно будет проработать это)
        const { songName } = req.params

        // получение мета-данных об аудио
        const audio = await NodeID3.read(`./uploads/${songName}.mp3`)

        if (!audio) {
            return res.status(404).send('No song name found')
        }

        return res.status(200).json({ audio })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error while getting audio",
        })
    }
};

// используем отдельную функцию для проверки расширения файла ДО его сохранения
export const fileFilter = (req, file, cb) => {
    // допустимые расширения
    const allowedExtensions = ['.mp3', '.wav', '.vma', '.flac', '.mid', '.midi']
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedExtensions.includes(ext)) {
        cb(null, true) // отправляем файл далее на сохранение
    } else {
        cb(new Error('Недопустимое расширение файла'), false) // отклоняем, создавая ошибку
    }
}