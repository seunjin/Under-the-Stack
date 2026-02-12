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
        <div className="w-[280px] border-r border-border shrink-0 bg-sidebar">
          {sidebar || (
            <div className="p-4 text-sm text-muted-foreground">
              Sidebar Placeholder
            </div>
          )}
        </div>

        {/* Main Content & Visualizer (Resizable) */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Center Content 영역 */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <ScrollArea className="h-full border-r border-border">
                <div className="max-w-3xl mx-auto p-8 lg:p-12">
                  {content || (
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold tracking-tight">
                        Technical Concepts
                      </h1>
                      <p className="text-muted-foreground leading-relaxed">
                        MDX content will be rendered here.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Visualizer 영역 */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <div className="h-full flex flex-col bg-[#09090b]">
                {visualizer || (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Visualizer Workbench
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </SidebarProvider>
  )
}
