import { ZoomInIcon, ZoomOutIcon } from "@/assets/icons/user-management";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeObserver, useStep } from "usehooks-ts";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Preview = ({ state, file, setUploadedFiles, onClose }) => {
  const [containerRef, setContainerRef] = useState(null);
  const [maxPage, setMaxPage] = useState(0)

  const { width = 0 } = useResizeObserver({
    ref: { current: containerRef },
    box: 'border-box',
  })

  const [currentPage, helpers] = useStep(maxPage)
  const [currentScale, scaleHelpers] = useStep(10)

  useEffect(() => {
    if (!state.value) return
    scaleHelpers.setStep(7)
  }, [state.value]);

  const options = useMemo(() => ({
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
  }), []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setMaxPage(numPages)
  }

  const handleModalClose = () => {
    helpers.reset()
    scaleHelpers.reset()
    setContainerRef(null)
    setMaxPage(0)
    onClose()
  }

  const isVideo = file?.file.includes(".mp4") || file?.file.includes(".webm");
  const isImage = file?.file.includes(".png") || file?.file.includes(".jpg") || file?.file.includes(".jpeg")
  const isPDF = file?.file.includes(".pdf");

  return (
    <Dialog open={state.value} onOpenChange={state.setValue}>
      <DialogContent showCloseButton={false} className="py-5 px-7 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">Preview</DialogTitle>
          <Button type="button" variant="outlined" className="p-0 absolute right-0 top-1/2 -translate-y-1/2" onClick={handleModalClose}>
            <X className="size-5 text-text-4" />
          </Button>
          <VisuallyHidden.Root>
            <DialogDescription>
              preview of uploaded verification proof
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <div className="flex flex-col gap-y-8">
          {isVideo
            &&
            <div className="h-full max-h-[410px]">
              <video controls muted autoPlay src={file?.file} className="rounded-xl" />
            </div>
          }
          {isPDF
            && <div className="flex flex-col gap-y-3">
              <div ref={setContainerRef} className="w-full shadow-[0_3px_12px_#3E4A721F] rounded-xl overflow-hidden">
                <Document file={file?.file} options={options} onLoadSuccess={onDocumentLoadSuccess} loading={<div className="h-[410px] bg-text-1 opacity-10 animate-pulse" />}>
                  <Page pageNumber={currentPage} width={width} scale={currentScale / 10} className="[&>canvas]:!w-full" loading={<div className="h-[410px] bg-text-1 opacity-10 animate-pulse" />} />
                </Document>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                  <Button type="button" className="w-max p-2 bg-text-6 rounded-full hover:bg-text-6"
                    onClick={() => helpers.goToPrevStep()}
                    disabled={!helpers.canGoToPrevStep}
                  >
                    <ChevronLeft className="size-4 text-text-1" />
                  </Button>
                  <span className="text-sm text-text-1">{currentPage}/{maxPage}</span>
                  <Button type="button" className="w-max p-2 bg-text-6 rounded-full hover:bg-text-6"
                    onClick={() => helpers.goToNextStep()}
                    disabled={!helpers.canGoToNextStep}
                  >
                    <ChevronRight className="size-4 text-text-1" />
                  </Button>
                </div>
                <div className="flex items-center gap-x-4">
                  <Button type="button" className="w-max p-2 bg-text-6 rounded-full hover:bg-text-6"
                    onClick={() => scaleHelpers.goToPrevStep()}
                    disabled={!scaleHelpers.canGoToPrevStep}
                  >
                    <ZoomOutIcon className="size-[18px] stroke-text-1" />
                  </Button>
                  <span className="text-sm text-text-1">{currentScale * 10}%</span>
                  <Button type="button" className="w-max p-2 bg-text-6 rounded-full hover:bg-text-6"
                    onClick={() => scaleHelpers.goToNextStep()}
                    disabled={!scaleHelpers.canGoToNextStep}
                  >
                    <ZoomInIcon className="size-[18px] stroke-text-1" />
                  </Button>
                </div>
              </div>
            </div>}
          <div className="flex items-center gap-x-2">
            <Button type="button" className="w-full p-2.5 rounded-xl bg-text-6 text-text-1 hover:bg-text-6"
              onClick={() => {
                setUploadedFiles(prev => prev.map((data, i) => i === file?.index ? { ...data, approved: false } : data))
                handleModalClose()
              }}
            >
              Reject
            </Button>
            <Button type="button" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7"
              onClick={() => {
                setUploadedFiles(prev => prev.map((data, i) => i === file?.index ? { ...data, approved: true } : data))
                handleModalClose()
              }}
            >
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default Preview