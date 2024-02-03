// ================================================================================
// Code generated and maintained by GoFrame CLI tool. DO NOT EDIT.
// You can delete these comments if you wish manually maintain this interface file.
// ================================================================================

package service

import (
	"context"
	"shipmgr/internal/model"
)

type (
	IShipmanage interface {
		AddPart(ctx context.Context, input model.PartInput) (err error)
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
