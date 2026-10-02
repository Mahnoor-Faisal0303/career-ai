import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

export async function extractPdfText(file: File): Promise<string> {
  const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
  GlobalWorkerOptions.workerSrc = pdfWorkerUrl

  const data = new Uint8Array(await file.arrayBuffer())
  const loadingTask = getDocument({ data })
  try {
    const pdf = await loadingTask.promise
    const pages: string[] = []

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()
      const pageText = content.items
        .map((item) => ('str' in item ? item.str : ''))
        .filter(Boolean)
        .join(' ')

      pages.push(pageText)
    }

    return pages.join('\n\n').trim()
  } finally {
    await loadingTask.destroy()
  }
}
