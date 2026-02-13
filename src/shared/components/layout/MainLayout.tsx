/**
 * MainLayout 컴포넌트
 * 애플리케이션의 핵심 3분할 워크벤치 레이아웃을 정의합니다.
 * 좌측 사이드바, 중앙 컨텐츠 영역, 우측 시각화 영역으로 구성됩니다.
 */
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  SidebarProvider,
} from '@/shared/components/ui'

interface MainLayoutProps {
  sidebar?: React.ReactNode
  content?: React.ReactNode
  visualizer?: React.ReactNode
}

export function MainLayout({ sidebar, content, visualizer }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        {/* Left Sidebar Area */}
        <div className="w-[320px] border-r border-border shrink-0 bg-sidebar">
          {sidebar || (
            <div className="p-4 text-sm text-muted-foreground">
              Sidebar Placeholder
            </div>
          )}
        </div>

        {/* Main Content & Visualizer (Resizable) */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-full min-w-0"
          >
            {/* Center Content 영역 */}
            <ResizablePanel defaultSize={40} minSize={10} className="min-w-0">
              <div className="h-full w-full min-w-0 overflow-hidden grid grid-cols-1">
                <ScrollArea className="min-w-0 w-full border-r border-border">
                  <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-12 min-w-0 w-full grid grid-cols-1">
                    <div className="min-w-0">{content}</div>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Visualizer 영역 */}
            <ResizablePanel defaultSize={50} minSize={10}>
              <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm min-w-0">
                {visualizer}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SidebarProvider>
  )
}
