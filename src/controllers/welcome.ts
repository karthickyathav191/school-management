import xlsx from 'xlsx'
import DB from '@/utils/db'

type InsertStudentData = {
  Name: string
  Standard: string
  Section: string
}

type WelcomeController = {
  upload: RouteCB
}

const welcome: WelcomeController = {
  upload: async (req, res) => {
    const workBook = xlsx.read(req?.file?.buffer, { type: 'buffer' }),
      sheetJsonData: InsertStudentData[] = xlsx.utils.sheet_to_json(workBook.Sheets['Sheet1'])
      const records = sheetJsonData.map(({ Name, Standard, Section }) => [1, Name, Standard, Section], sheetJsonData),
        query = DB.format('INSERT INTO students(school_id, name, standard, section) VALUES ?', [records])
    DB.execute(query, (err, result) => {
      if (!err) res.json(result)
    })
  }
}

export default welcome
