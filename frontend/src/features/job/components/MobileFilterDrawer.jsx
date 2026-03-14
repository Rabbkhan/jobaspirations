import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet'
import { Button } from '@/shared/ui/button'
import HeaderFilterBar from './HeaderFilterBar'

const MobileFilterDrawer = ({ filters, setFilters, resetFilters }) => {
    return (
        <div className="md:hidden mb-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full">
                        Filters
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="bottom"
                    className="rounded-t-2xl">
                    <HeaderFilterBar
                        filters={filters}
                        setFilters={setFilters}
                        isMobile
                        resetFilters={resetFilters}
                    />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileFilterDrawer
