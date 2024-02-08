// ================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// You can delete these comments if you wish manually maintain this interface file.
// ================================================================================

package service

import (
	"context"
	"shipmgr/api/part/V1"
	"shipmgr/internal/model"
)

type (
	IShipmanage interface {
		AddPart(ctx context.Context, input model.PartInput) (err error)
		AddGroup(ctx context.Context, input model.GroupInput) (err error)
		UpdatePart(ctx context.Context, input V1.UpdateReq) (err error)
		ExportUnity(ctx context.Context) (*[]model.PartOutput, error)
		ExportFiltered(ctx context.Context, input V1.FilterReq) (*V1.FilterRes, error)
	}
)

var (
	localShipmanage IShipmanage
)

func Shipmanage() IShipmanage {
	if localShipmanage == nil {
		panic("implement not found for interface IShipmanage, forgot register?")
	}
	return localShipmanage
}

func RegisterShipmanage(i IShipmanage) {
	localShipmanage = i
}
