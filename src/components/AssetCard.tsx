import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2 } from "lucide-react";
import type { Asset } from "@/utils/cgtCalculations";

type AssetCardProps = {
  asset: Asset;
  assetNumber: number;
  onUpdate: (updates: Partial<Asset>) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export function AssetCard({
  asset,
  assetNumber,
  onUpdate,
  onRemove,
  canRemove,
}: AssetCardProps) {
  // Local UI strings so fields can be empty and won’t force 0
  const nf = useMemo(
    () => new Intl.NumberFormat("en-AU", { maximumFractionDigits: 2 }),
    []
  );
  const stripNonNumeric = (raw: string) =>
    raw.replace(/,/g, "").replace(/[^\d.]/g, "");
  const sanitize = (raw: string) =>
    stripNonNumeric(raw).replace(/^0+(?=\d)/, "");

  const [purchaseStr, setPurchaseStr] = useState(
    asset.purchasePrice ? String(asset.purchasePrice) : ""
  );
  const [costsStr, setCostsStr] = useState(
    asset.additionalCosts ? String(asset.additionalCosts) : ""
  );
  const [saleStr, setSaleStr] = useState(
    asset.salePrice ? String(asset.salePrice) : ""
  );

  useEffect(() => {
    setPurchaseStr(asset.purchasePrice ? String(asset.purchasePrice) : "");
    setCostsStr(asset.additionalCosts ? String(asset.additionalCosts) : "");
    setSaleStr(asset.salePrice ? String(asset.salePrice) : "");
  }, [asset.purchasePrice, asset.additionalCosts, asset.salePrice]);

  const clearOnFocus =
    (val: string, setter: (s: string) => void) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      setter(stripNonNumeric(val));
      if (val === "0") setter("");
    };

  const formatOnBlur =
    (setter: (s: string) => void, commit: (n: number) => void) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = stripNonNumeric(e.currentTarget.value);
      if (raw === "" || isNaN(Number(raw))) {
        setter("");
        commit(0);
        return;
      }
      const num = Number(raw);
      setter(nf.format(num));
      commit(num);
    };

  return (
    <Card className="border-2 border-muted bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{`Asset ${assetNumber}`}</CardTitle>
          {canRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
              aria-label={`Remove asset ${assetNumber}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Ownership Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Have you owned the asset for at least 12 months?
          </Label>
          <RadioGroup
            value={asset.ownedMoreThan12Months ? "yes" : "no"}
            onValueChange={(v) =>
              onUpdate({ ownedMoreThan12Months: v === "yes" })
            }
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`${asset.id}-12months-yes`} />
              <Label htmlFor={`${asset.id}-12months-yes`} className="text-sm">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`${asset.id}-12months-no`} />
              <Label htmlFor={`${asset.id}-12months-no`} className="text-sm">
                No
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Purchase Price */}
        <div className="space-y-2">
          <Label
            htmlFor={`${asset.id}-purchase`}
            className="text-sm font-medium"
          >
            Purchase price of asset
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id={`${asset.id}-purchase`}
              type="text"
              inputMode="decimal"
              value={purchaseStr}
              onFocus={clearOnFocus(purchaseStr, setPurchaseStr)}
              onChange={(e) => {
                const v = sanitize(e.target.value);
                setPurchaseStr(v);
                onUpdate({ purchasePrice: v === "" ? 0 : Number(v) });
              }}
              onBlur={formatOnBlur(setPurchaseStr, (n) =>
                onUpdate({ purchasePrice: n })
              )}
              className="pl-8 h-11 rounded-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Additional Costs */}
        <div className="space-y-2">
          <Label htmlFor={`${asset.id}-costs`} className="text-sm font-medium">
            Additional costs of purchasing, owning and selling the asset
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id={`${asset.id}-costs`}
              type="text"
              inputMode="decimal"
              value={costsStr}
              onFocus={clearOnFocus(costsStr, setCostsStr)}
              onChange={(e) => {
                const v = sanitize(e.target.value);
                setCostsStr(v);
                onUpdate({ additionalCosts: v === "" ? 0 : Number(v) });
              }}
              onBlur={formatOnBlur(setCostsStr, (n) =>
                onUpdate({ additionalCosts: n })
              )}
              className="pl-8 h-11 rounded-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Sale Price */}
        <div className="space-y-2">
          <Label htmlFor={`${asset.id}-sale`} className="text-sm font-medium">
            Sale price of asset
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              id={`${asset.id}-sale`}
              type="text"
              inputMode="decimal"
              value={saleStr}
              onFocus={clearOnFocus(saleStr, setSaleStr)}
              onChange={(e) => {
                const v = sanitize(e.target.value);
                setSaleStr(v);
                onUpdate({ salePrice: v === "" ? 0 : Number(v) });
              }}
              onBlur={formatOnBlur(setSaleStr, (n) =>
                onUpdate({ salePrice: n })
              )}
              className="pl-8 h-11 rounded-lg"
              placeholder="0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
