import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AssetCard } from "@/components/AssetCard";
import type { CGTInputs, Asset } from "@/utils/cgtCalculations";

interface CalculatorFormProps {
  inputs: CGTInputs;
  onChange: (inputs: CGTInputs) => void;
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const updateInputs = (updates: Partial<CGTInputs>) =>
    onChange({ ...inputs, ...updates });

  // Number formatting helpers (typing = raw, blur = formatted)
  const nf = useMemo(
    () => new Intl.NumberFormat("en-AU", { maximumFractionDigits: 2 }),
    []
  );
  const stripNonNumeric = (raw: string) =>
    raw.replace(/,/g, "").replace(/[^\d.]/g, "");
  const sanitize = (raw: string) =>
    stripNonNumeric(raw).replace(/^0+(?=\d)/, "");

  // Local UI strings so fields can be empty without showing 0
  const [incomeStr, setIncomeStr] = useState(
    inputs.annualTaxableIncome ? String(inputs.annualTaxableIncome) : ""
  );
  const [lossStr, setLossStr] = useState(
    inputs.unappliedLossesAmount ? String(inputs.unappliedLossesAmount) : ""
  );

  useEffect(() => {
    setIncomeStr(
      inputs.annualTaxableIncome ? String(inputs.annualTaxableIncome) : ""
    );
    setLossStr(
      inputs.unappliedLossesAmount ? String(inputs.unappliedLossesAmount) : ""
    );
  }, [inputs.annualTaxableIncome, inputs.unappliedLossesAmount]);

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

  // Assets CRUD
  const addAsset = () => {
    const newAsset: Asset = {
      id: `asset-${inputs.assets.length + 1}`,
      ownedMoreThan12Months: true,
      purchasePrice: 0,
      additionalCosts: 0,
      salePrice: 0,
    };
    updateInputs({ assets: [...inputs.assets, newAsset] });
  };

  const updateAsset = (assetId: string, updates: Partial<Asset>) => {
    updateInputs({
      assets: inputs.assets.map((a) =>
        a.id === assetId ? { ...a, ...updates } : a
      ),
    });
  };

  const removeAsset = (assetId: string) => {
    if (inputs.assets.length > 1) {
      updateInputs({ assets: inputs.assets.filter((a) => a.id !== assetId) });
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="bg-card border border-border/60 shadow-sm">
          <CardContent className="p-6 space-y-6">
            {/* Row: Annual Taxable Income | Income Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Annual taxable income */}
              <div className="space-y-2">
                <Label htmlFor="income" className="text-sm font-medium">
                  Annual taxable income (before tax)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="income"
                    type="text"
                    inputMode="decimal"
                    value={incomeStr}
                    onFocus={clearOnFocus(incomeStr, setIncomeStr)}
                    onChange={(e) => {
                      const v = sanitize(e.target.value);
                      setIncomeStr(v);
                      updateInputs({
                        annualTaxableIncome: v === "" ? 0 : Number(v),
                      });
                    }}
                    onBlur={formatOnBlur(setIncomeStr, (n) =>
                      updateInputs({ annualTaxableIncome: n })
                    )}
                    className="pl-8 h-11 rounded-lg"
                    placeholder="90,000"
                  />
                </div>
              </div>

              {/* Income year */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Income year</Label>
                <Select
                  value={inputs.incomeYear}
                  onValueChange={(v) =>
                    updateInputs({
                      incomeYear: v as CGTInputs["incomeYear"],
                    })
                  }
                >
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Any unapplied net capital losses from previous years? */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  Any unapplied net capital losses from previous years?
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Add prior-year capital losses to offset current gains.
                  </TooltipContent>
                </Tooltip>
              </div>
              <RadioGroup
                className="flex gap-6"
                value={inputs.hasUnappliedLosses ? "yes" : "no"}
                onValueChange={(v) =>
                  updateInputs({ hasUnappliedLosses: v === "yes" })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="loss-yes" value="yes" />
                  <Label htmlFor="loss-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="loss-no" value="no" />
                  <Label htmlFor="loss-no">No</Label>
                </div>
              </RadioGroup>

              {inputs.hasUnappliedLosses && (
                <div className="mt-2">
                  <Label
                    htmlFor="losses-amount"
                    className="text-sm font-medium"
                  >
                    Amount of unapplied losses
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="losses-amount"
                      type="text"
                      inputMode="decimal"
                      value={lossStr}
                      onFocus={clearOnFocus(lossStr, setLossStr)}
                      onChange={(e) => {
                        const v = sanitize(e.target.value);
                        setLossStr(v);
                        updateInputs({
                          unappliedLossesAmount: v === "" ? 0 : Number(v),
                        });
                      }}
                      onBlur={formatOnBlur(setLossStr, (n) =>
                        updateInputs({ unappliedLossesAmount: n })
                      )}
                      className="pl-8 h-11 rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Did you purchase any assets before 20 Sep 1985? */}
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  Did you purchase any assets before 20 Sep 1985?
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Pre-1985 assets are generally exempt from CGT.
                  </TooltipContent>
                </Tooltip>
              </div>
              <RadioGroup
                className="flex gap-6"
                value={inputs.assetsPurchasedBefore1985 ? "yes" : "no"}
                onValueChange={(v) =>
                  updateInputs({ assetsPurchasedBefore1985: v === "yes" })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pre85-yes" value="yes" />
                  <Label htmlFor="pre85-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pre85-no" value="no" />
                  <Label htmlFor="pre85-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Foreign or temporary resident? */}
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  Foreign or temporary resident whilst holding the asset(s)?
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Foreign/temporary residents generally don’t get the 50% CGT
                    discount.
                  </TooltipContent>
                </Tooltip>
              </div>
              <RadioGroup
                className="flex gap-6"
                value={inputs.foreignOrTemporaryResident ? "yes" : "no"}
                onValueChange={(v) =>
                  updateInputs({ foreignOrTemporaryResident: v === "yes" })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="res-yes" value="yes" />
                  <Label htmlFor="res-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="res-no" value="no" />
                  <Label htmlFor="res-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* --- Assets --- */}
            <Separator />
            <div className="space-y-5">
              {inputs.assets.map((asset, idx) => (
                <div key={asset.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{`Asset ${
                      idx + 1
                    }`}</div>
                  </div>

                  <AssetCard
                    asset={asset}
                    assetNumber={idx + 1}
                    onUpdate={(up) => updateAsset(asset.id, up)}
                    onRemove={() => removeAsset(asset.id)}
                    canRemove={inputs.assets.length > 1}
                  />

                  {idx !== inputs.assets.length - 1 && (
                    <div className="border-t border-border/60" />
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={addAsset}
                className="w-full h-11 rounded-full font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add another asset +
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
